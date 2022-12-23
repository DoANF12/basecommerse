import bcrypt from 'bcryptjs'

const data = {
    users:[
        {
            name:'Fer',
            email:'fer@gmail.com',
            password: bcrypt.hashSync('123'),
            isAdmin: true
        },
        {
            name:'Ery',
            email:'ery@gmail.com',
            password: bcrypt.hashSync('123'),
            isAdmin: false
        }
    ],
    books: [
        {
            //id:'1',
            title:"Julian",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAA",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"3", 
            numReviews:"200",
            image:"/images/p2.webp",
            counInstock:"3"
        },
        {
            //id:'2',
            title:"Lola",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAb",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"4", 
            numReviews:"200",
            image:"/images/p3.webp",
            counInstock:"0"
        },
        {
            //id:'3',
            title:"Romero",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAd",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"4", 
            numReviews:"200",
            image:"/images/p1.webp",
            counInstock:"6"
        },
        {
            //id:'4',
            title:"Delat",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAc",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"4", 
            numReviews:"200",
            image:"/images/p4.webp",
            counInstock:"2"
        },
        {
            //id:'5',
            title:"Fer",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAf",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"4", 
            numReviews:"200",
            image:"/images/p4.webp",
            counInstock:"3"
        },
        {
            //id:'6',
            title:"Cris",
            subtitle:"Ara ara",
            autor:"Gullermo Segollanes",
            editorial:"SSS",
            isbn13:"AAAe",
            añop:"1999",
            price:"200",
            descripcion:"Buena tarda",
            rating:"4", 
            numReviews:"200",
            image:"/images/p1.webp",
            counInstock:"0"
        },
    ]
};

export default data