import { and, count, gte, lte, eq, sql, desc } from "drizzle-orm";
import { db } from "..";
import { goalCompletions, goals } from "../schema";
import dayjs from "dayjs";


export async function getWeekSummary() {
    const lastDayOfWeek = dayjs().endOf('week').toDate();
    const firstDayOfWeek = dayjs().startOf('week').toDate();
    
    const goalCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
        })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    )

    const goalCompletedInWeek = db.$with('goal_completed_in_week').as(
        db
        .select({
            id: goals.id,
            title: goals.title,
            completedAt: goalCompletions.createdAt,
            completedAtDate: sql/*sql*/`
                date(${goalCompletions.createdAt})
            `.as('completedAtDate')
        })
        .from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(
            and(
                gte(goalCompletions.createdAt, firstDayOfWeek),
                lte(goalCompletions.createdAt, lastDayOfWeek)
        ))
        .orderBy(desc(goalCompletions.createdAt))
    )

    const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
        db
            .select({
                completedAtDate: goalCompletedInWeek.completedAtDate,
                completions: sql /*sql*/`
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', ${goalCompletedInWeek.id},
                            'title', ${goalCompletedInWeek.title},
                            'completedAt', ${goalCompletedInWeek.completedAt}
                        )
                    )
                `.as('completions'),
            })
            .from(goalCompletedInWeek)
            .groupBy(goalCompletedInWeek.completedAtDate)
            .orderBy(desc(goalCompletedInWeek.completedAtDate))
    )

    type goalsPerDay = Record<string, {
        id: string,
        title: string,
        completedAt: string,
    }[]>

    const result = await db
    .with(goalCreatedUpToWeek, goalCompletedInWeek, goalsCompletedByWeekDay)
    .select({
        completed: 
            sql /*sql*/`(SELECT COUNT(*) FROM ${goalCompletedInWeek})`.mapWith(Number),
        total: 
            sql /*sql*/`(SELECT SUM(${goalCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalCreatedUpToWeek})`.mapWith(Number),
        goalsPerDay:
            sql /*sql*/<goalsPerDay>`
                JSON_OBJECT_AGG(
                    ${goalsCompletedByWeekDay.completedAtDate},
                    ${goalsCompletedByWeekDay.completions}
                )`
    })
    .from(goalsCompletedByWeekDay)

    return {
        summary: result[0],
    }
}