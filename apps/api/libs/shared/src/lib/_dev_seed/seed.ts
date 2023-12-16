import {faker} from "@faker-js/faker"
import { SelectUser } from "../drizzle/schema"


async function main(){
    console.log('Start seeding.')
await seedUser()
await seedCategory()
await seedCourse()
await seedVideo()
await seedFavorite()
await seedPlaylist()
await seedViewRecords()

console.log("All seeding complete")
}

const AUTH_HEADER ={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5MywiaWF0IjoxNzAyNzIyMjkzfQ.NIjHCLXTXJoE2EHUnU8YCGrAr4H0R06TGBpMnOVuYZg"}
const USERS = 500
const TEACHERS = 50
const STUDENTS = USERS-TEACHERS
const CATEGORIES=5
const COURSES =10
const VIDEOS=50
const FAVORITES = 20
const VIEW_RECORDS =300
const PLAYLISTS = 50


const seedUser = async ()=>{
    console.log("Seeding teachers")

    for(let i =1;i<=TEACHERS;i++){
        const teacher  = {
            name:faker.person.firstName()+i,
            'email':i+faker.internet.email(),
            'password':"password",
        } satisfies Partial<SelectUser>
        
        
        const res =await fetch('http://localhost:3000/auth/register',{body:JSON.stringify(teacher),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        const res2 =await fetch('http://localhost:3000/auth/changeRole',{body:JSON.stringify({userId:i,role:'teacher'}),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
    }


    console.log("Seeding teachers complete")

    console.log("Seeding students")

    for(let i =TEACHERS+1;i<=STUDENTS;i++){
        const student  = {
            name:faker.person.firstName()+i,
            'email':i+faker.internet.email(),
            'password':"password",
        } satisfies Partial<SelectUser>
        
        
        const res =await fetch('http://localhost:3000/auth/register',{body:JSON.stringify(student),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding students complete")
}

const seedCategory =async ()=>{
    console.log("Seeding category")

    for(let i =1;i<=CATEGORIES;i++){
        const category  = {
            name:faker.word.noun()
        } 
        
        
        
        await fetch('http://localhost:3000/category',{body:JSON.stringify(category),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding category complete")
}
const seedCourse =async ()=>{
    console.log("Seeding course")

    for(let i =1;i<=COURSES;i++){
        const course  = {
            name:faker.word.noun(),
            description:faker.word.words(5),
            teacherId:1+(i%TEACHERS),
            categoryId:1+(i%CATEGORIES),
            thumbnail:faker.image.avatar()

        } 
        
       
        
        await fetch('http://localhost:3000/courses',{body:JSON.stringify(course),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding course complete")
}
const seedVideo =async ()=>{
    console.log("Seeding video")

    for(let i =1;i<=VIDEOS;i++){
        const video  = {
            name:faker.word.noun(),
            description:faker.word.words(5),
            courseId:1+(i%COURSES),
            fileLink:faker.image.url(),
            length:'07:30'
        } 
        
       
        
        await fetch('http://localhost:3000/videos',{body:JSON.stringify(video),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding video complete")
}
const seedFavorite =async ()=>{
    console.log("Seeding favorites")

    for(let i =1;i<=FAVORITES;i++){
        const favorite  = {
            userId : 1+(i%USERS),
            videoId:1+(i%VIDEOS)
        } 
       
        try{

            await fetch('http://localhost:3000/favorites',{body:JSON.stringify(favorite),method:'POST', headers: {
                "Content-Type": "application/json",...AUTH_HEADER
            },})
        }catch(err){
            console.log(err)
        }
            
    }
    console.log("Seeding favorites complete")
}
const seedPlaylist =async ()=>{
    console.log("Seeding playlists")

    for(let i =1;i<=PLAYLISTS;i++){
        const playlist  = {
            userId : 1+(i%USERS),
            courseId:1+(i%VIDEOS)
        } 

        await fetch('http://localhost:3000/playlists',{body:JSON.stringify(playlist),method:'POST', headers: {
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding playlists complete")
}
const seedViewRecords =async ()=>{
    console.log("Seeding view records")

    for(let i =1;i<=VIEW_RECORDS;i++){
        const playlist  = {
            userId :1+ (i%USERS),
            videoId:1+ (i%VIDEOS),
            videoTimeAnchor:`00:30`
        } 
        
        await fetch('http://localhost:3000/view-record',{body:JSON.stringify(playlist),method:'POST', headers: {
            
            "Content-Type": "application/json",...AUTH_HEADER
        },})
        
    }
    console.log("Seeding view records complete")
}



main()