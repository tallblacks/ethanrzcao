# ethanrzcao.com

## Project Description
Ethan is my son, and this website is his personal site. I hope Ethan will maintain and upgrade this website himself in the future.

## Tech Stack
- Frontend Framework: Next.JS
- CSS: Tailwind
- UI Components: Material UI
- Cloud Hosting: Vercel
- Database: AWS DynamoDB

## Project Selection

#### Docusaurus
Initially, I considered using [Docusaurus](https://docusaurus.io/). However, I found that using Docusaurus would complicate things.

I could simply use Next.JS and choose a basic template from Vercel, making minimal modifications.

#### Vercel Blog Starter
I examined two examples on [Vercel Examples](https://github.com/vercel/next.js/tree/canary/examples/): [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) and [blog](https://github.com/vercel/next.js/tree/canary/examples/blog).

Both examples convert MarkDown files into web pages. Comparatively, the blog example was too complex for my goals, and the default layout was not as appealing as the blog-starter. Hence, I chose the blog-starter.

#### TimeLine
I wanted a TimeLine feature to record Ethan's milestones, such as flying on a plane, staying in hotels, arriving in new cities, visiting parks and museums, and other life journeys.

At one point, I considered using [React Vertical Timeline](https://stephane-monnot.github.io/react-vertical-timeline/), which looks great but hasn't been updated for years.

So, I decided to use the [Timeline component](https://mui.com/material-ui/react-timeline/) from [Material UI](https://mui.com/material-ui/).

#### MongoDB
[MongoDB](https://www.mongodb.com/) Atlas now offers only 512MB of free storage, which is more than enough for a personal website. However, it's still much less compared to the 25GB free space provided by AWS.  
[Comparison of MongoDB's three paid plans](https://www.mongodb.com/pricing)

#### AWS DynamoDB
[The free 25GB storage](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=categories%23databases) is excellent.  
[The free courses](https://aws.amazon.com/dynamodb/getting-started/?pg=dynamodbt&sec=hs) are nice.  

AWS is highly recognized in New Zealand, which is an important advantage.

I plan to store the TimeLine data in the database. The data includes staying in hotels, flying, attending school or classes, births, and birthdays.  

Although we can organize the data into time, place, people, and events, my intuition leans towards a NoSQL database.
Therefore, I chose AWS DynamoDB for this project.

## Project Development

#### Setting Up Project
```bash
yarn create next-app --example blog-starter ethanrzcao
cd ethanrzcao
code .

yarn
yarn dev
```

For the development of the timeline component, the following packages need to be installed.
```bash
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/lab @mui/icons-material

yarn add dotenv
yarn add @aws-sdk/client-dynamodb
```

#### Modify Files
- \_posts\
Blog Articles Directory  
Delete the original three Blog .md files  
Create two new Blog .md files

- \public\assets\blog\authors\
Blog Author Avatar Images Directory  
Delete the original three avatar images  
Create an avatar image of Ethan with the same dimensions

- \public\assets\blog\meet-ethan\ and \public\assets\blog\my-awesome-family\
The images for blog articles are located in the directory \public\assets\blog, with one directory per blog.  
Delete the original three blog image directories.  
Create two new image directories corresponding to the above blog articles and copy the images into them.

- \public\favicon\
Icons Directory 
Replace the original icons with new project icons, totaling 8.  
Change the values of "name": "Next.js" and "short_name": "Next.js" in the site.webmanifest file to "Ethan Ruizhe Cao".

- \src\app\_components\footer.tsx
Modify Footer

- \src\app\_components\header.tsx
Modify Header Top Left Text

- \src\app\_components\intro.tsx
Modify the Top Sections on the Left and Right of the Homepage

- \src\app\posts\[slug]\page.tsx
Comment out the warning at the top of the page.  
{ /* <Alert preview={post.preview} /> */ }

- \app\layout.tsx
Modify Metadata

- \src\lib\markdownToHtml.ts
Do not filter HTML code during Markdown conversion, as there might be videos included.
// const result = await remark().use(html).process(markdown);
const result = await remark().use(html, { sanitize: false }).process(markdown)

- README.md
Rewrite the project documentation.

#### The Timeline Component
- \src\app\myjourney\page.tsx
Timeline main page

- \src\app\_components\timeline.tsx
The <EthanTimeline /> component used on the page

- \src\lib\getTimelineData.ts
The function to retrieve data from the database

- \src\interfaces\timelineitem.ts
Defining the format of data retrieved from the database

- \.env
AWS DynamoDB database keys environment variable, do not sync to GitHub.  
Add this file to .gitignore

#### AWS DynamoDB
Please refer to my other GitHub repository for reference. [aws-dynamodb](https://github.com/tallblacks/aws-dynamodb)

#### Table structure
A table designed to describe the Timeline of Ethan's journey.  
This is currently the only table on ethanrzcao project.

Each item definitely includes the following four parts:  
- **date**
string  
Most are like "20/10/2021," with a few like "July 2023."
- **type**
string  
Similar to the icon names in the @mui/icons-material/ package, such as Museum, Hotel, etc.
- **event**
string  
- **description**
string  
- **timelineOrder**
number
Specifically designed for sorting purposes, the numeric format is 'YYYYMMDD00', where the last two digits '00' are used to differentiate between different events on the same day.
- **type = Hotel**
When the type is Hotel, there will be:  
hotel group, hotel brand, hotel name, hotel city, Hotel country, number of nights
- **type = Museum**
When the type is Museum, there will be:  
museum name, museum city, museum country
- **type = FlightTakeoff | FlightLand | Fight**
When the type is FlightTakeoff，or FlightLand, or Fight, there will be:  
airline, aircraft type, flight number, cabin class, departure city and departureCountry (No, when FlightLand available), arrival city and arrivalCountry (No, when FlightTakeoff available)

#### Git & GitHub
```bash
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/tallblacks/ethanrzcao.git
git push -u origin main
```