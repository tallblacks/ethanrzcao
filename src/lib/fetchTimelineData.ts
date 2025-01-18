import dotenv from "dotenv"
import { EthanTimelineItem } from "@/interfaces/timelineitem"

dotenv.config()

export const fetchTimelineData = async (): Promise<EthanTimelineItem[]> => {
    try {
        // const response = await fetch(process.env.API_URL as string)
        const response = await fetch(process.env.API_URL as string, {
            method: 'GET',
            headers: {
                'Authorization': process.env.APIGATEWAY_HTTP_AUTH as string
            }
        })
        const data = await response.json()
        console.log(response)
        if (response.status !== 200) {
            throw new Error(data.body)
        }

        // 将 JSON 响应映射到 TimelineItem 数组
        const timelineItems: EthanTimelineItem[] = data.map((item: any) => ({
            type: item.type || "",
            date: item.date || "",
            event: item.event || "",
            description: item.description || "",
            timelineOrder: parseInt(item.timelineOrder || "0", 10),
        }))

        return timelineItems
    } catch (error) {
        console.error("Error fetching timeline data:", error)
        throw error
    }
}