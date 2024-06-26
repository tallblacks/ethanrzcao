import dotenv from "dotenv"
import { ScanCommand , DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { EthanTimelineItem } from "@/interfaces/timelineitem"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
})

export const getTimelineData = async (): Promise<EthanTimelineItem[]> => {
    const command = new ScanCommand({
        ProjectionExpression: "#dt, #tp, event, description, timelineOrder",
        ExpressionAttributeNames: {
            "#dt": "date",
            "#tp": "type"
        },
        TableName: "ethan-timeline",
    })

    const response = await client.send(command)
    console.log(response)
    // 将 DynamoDB 响应映射到 TimelineItem 数组
    const timelineItems: EthanTimelineItem[] = response.Items? response.Items.map((item) => ({
        type: item.type.S || "",
        date: item.date.S || "",
        event: item.event.S || "",
        description: item.description.S || "",
        timelineOrder: parseInt(item.timelineOrder.N || "0", 10),
    })) : []

    // 对结果进行排序
    const sortedItems = timelineItems.sort((a, b) => a.timelineOrder - b.timelineOrder)

    return sortedItems
}