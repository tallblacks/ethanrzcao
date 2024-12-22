import Timeline from "@mui/lab/Timeline"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineContent from "@mui/lab/TimelineContent"
import Typography from "@mui/material/Typography"
import Celebration from "@mui/icons-material/Celebration"
import Museum from "@mui/icons-material/Museum"
import Scale from "@mui/icons-material/Scale"
import Cake from "@mui/icons-material/Cake"
import FlightTakeoff from "@mui/icons-material/FlightTakeoff"
import FlightLand from "@mui/icons-material/FlightLand"
import School from "@mui/icons-material/School"
import Hotel from "@mui/icons-material/Hotel"
import Attractions from "@mui/icons-material/Attractions"
import Flight from "@mui/icons-material/Flight"
import ChildCare from "@mui/icons-material/ChildCare"
import SubwayIcon from '@mui/icons-material/Subway'
import PetsIcon from '@mui/icons-material/Pets'
import FestivalIcon from '@mui/icons-material/Festival'
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'

import React from "react"
import { EthanTimelineItem } from "@/interfaces/timelineitem"
import { fetchTimelineData } from "@/lib/fetchTimelineData"
// import { getTimelineData } from "@/lib/getTimelineData"

const iconComponents = {
    'Celebration': Celebration,
    'Museum': Museum,
    'Scale': Scale,
    'Cake': Cake,
    'FlightTakeoff': FlightTakeoff,
    'FlightLand': FlightLand,
    'School': School,
    'Hotel': Hotel,
    'Attractions': Attractions,
    'Flight': Flight,
    'ChildCare': ChildCare,
    'Subway': SubwayIcon,
    'Pets': PetsIcon,
    'Festival': FestivalIcon,
    'MartialArts': SportsMartialArtsIcon
}

const getIconComponent = (iconName: keyof typeof iconComponents) => {
    const IconComponent = iconComponents[iconName]
    return IconComponent || null
}

export default async function EthanTimeline() {
    try {
        const data: EthanTimelineItem[] = await fetchTimelineData()

        return (
            <Timeline position="alternate">
                <TimelineOppositeContent></TimelineOppositeContent>
                
                {data.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent 
                            sx={{ m: 'auto 0' }}
                            align={index % 2 === 0 ? 'right' : undefined}
                            variant="body2"
                            color="text.secondary"
                        >
                        {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                                <TimelineDot color="primary" variant={index % 2 === 0 ? undefined : 'outlined'}>
                                    {getIconComponent(item.type as keyof typeof iconComponents) && React.createElement(getIconComponent(item.type as keyof typeof iconComponents))}
                                </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                {item.event}
                            </Typography>
                            <Typography>
                                {item.description}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        )
    } catch (error) {
        return (<Timeline position="alternate"></Timeline>)
    }
}