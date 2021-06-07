var mongoose = require('mongoose');
var Movies = require('./models/movies.js');
var cinemas = require('./models/cinemas.js');

var cinemasdata = [
    {
        name: "Imove Paragon",
        image: "/images/cinemas/cine-paragon.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Paragon, 5th floor.",
        num: "1"
    },
    {
        name: "Imove Iconsiam",
        image: "/images/cinemas/cine-iconsaim.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Iconsiam, 5th floor.",
        num: "2"
    },
    {
        name: "Imove WestGate",
        image: "/images/cinemas/cine-weatgate.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at CentralPlaza WestGate, 5th floor.",
        num: "3"
    },
    {
        name: "Imove Pinklao",
        image: "/images/cinemas/cine-pinklao.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Pinklao, 5th floor.",
        num: "4"
    },
    
]

var data = [
    {
        name: "Joker",
        image: "/images/movies/joker/post-joker.jpg",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aaa79357-9476-4c1d-b9a8-6e881f2449d3/ddf2d7e-bcfd0bdb-461b-4dd2-b93c-1dcd68208788.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhYTc5MzU3LTk0NzYtNGMxZC1iOWE4LTZlODgxZjI0NDlkM1wvZGRmMmQ3ZS1iY2ZkMGJkYi00NjFiLTRkZDItYjkzYy0xZGNkNjgyMDg3ODgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UevkE3C2Dk2StjdI16y2Ew17AmbU0rOKrfdoDtbCEGs",
        trailer: "https://www.youtube-nocookie.com/embed/zAGVQLHvwOY",
        genre: "Crime/Thriller",
        director: "Todd Phillips",
        runtime: "2h 2min",
        score: 8.4,
        show: 'y',
        desc: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker."
    },
    {
        name: "Jurassic World: Fallen Kingdom",
        image: "/images/movies/jurassic/post-jura.jpg",
        logo: "https://inwfile.com/s-dz/0qjre3.png",
        trailer: "https://www.youtube-nocookie.com/embed/vn9mMeWcgoM",
        genre: "Action/Adventure",
        director: "J.A. Bayona",
        runtime: "2h 8 min",
        score: 6.2,
        show: 'y',
        desc: "When the island's dormant volcano begins roaring to life, Owen and Claire mount a campaign to rescue the remaining dinosaurs from this extinction-level event."
    },
    {
        name: "Happy Old Year",
        image: "/images/movies/happy/post-happy.jpg",
        logo: "https://media.discordapp.net/attachments/718002735475064874/841683191520690186/IMG_3227.PNG?width=1440&height=507",
        trailer: "https://www.youtube-nocookie.com/embed/V0PrIr9GK54",
        genre: "Drama/Romance",
        director: "Nawapol Thamrongrattanarit",
        runtime: "1h 53min",
        score: 7.2,
        show: 'y',
        desc: "A woman wants to reorganize her house and convert it into a home office. She will throw away anything that has been lying around unused. However, she faces a great challenge when she comes across some items that belonged to her ex-boyfriend."
    },
    {
        name: "Aquaman",
        image: "/images/movies/aquaman/post-aquaman.jpg",
        logo: "https://media.discordapp.net/attachments/718002735475064874/841685080585928704/image0.png?width=670&height=670",
        trailer: "https://www.youtube.com/embed/WDkg3h8PCVU",
        genre: "Action/Adventure",
        director: "James Wan",
        runtime: "2h 23min",
        score: 6.9,
        show: 'y',
        desc: "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land."
    },
    {
        name: "Venom",
        image: "/images/movies/venom/post-venom.png",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dddb8beb-7509-4c66-bc59-5e64fc25d614/dc2kdbo-23cebbbb-db46-488b-9729-9e968f06bec0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RkZGI4YmViLTc1MDktNGM2Ni1iYzU5LTVlNjRmYzI1ZDYxNFwvZGMya2Riby0yM2NlYmJiYi1kYjQ2LTQ4OGItOTcyOS05ZTk2OGYwNmJlYzAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NqsS3kJf8LM6kJapuvOrZ6oow-m9jmGo4D12Ou1KLLQ",
        trailer: "https://www.youtube-nocookie.com/embed/u9Mv98Gr5pY",
        genre: "Action/Adventure",
        director: "Ruben Fleischer",
        runtime: "1h 52min",
        score: 6.7,
        show: 'y',
        desc: "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it."
    },
    {
        name: "The Conjuring 2",
        image: "/images/movies/conjuring/post-conjuring.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/VFsmuRPClr4",
        genre: "Horror/Thriller",
        director: "James Wan",
        runtime: "2h 14min",
        score: 7.3,
        show: 'y',
        desc: "Ed and Lorraine Warren travel to North London to help a single mother raising four children alone in a house plagued by a supernatural spirit."
    },
    {
        name: "Don't Breathe",
        image: "/images/movies/dont/post-dont.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/76yBTNDB6vU",
        genre: "Horror/Thriller",
        director: "Fede Alvarez",
        runtime: "1h 28min",
        score: 7.1,
        show: 'y',
        desc: "Hoping to walk away with a massive fortune, a trio of thieves break into the house of a blind man who isn't as helpless as he seems."
    },
    {
        name: "Forrest Gump",
        image: "/images/movies/forrest/post-forrest.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/bLvqoHBptjg",
        genre: "Drama/Romance",
        director: "Robert Zemeckis",
        runtime: "2h 22min",
        score: 8.8,
        show: 'y',
        desc: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
    },
    {
        name: "Cinderella",
        image: "/images/movies/cinderella/post-cinderella.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/20DF6U1HcGQ",
        genre: "Drama/Fantasy",
        director: "Kenneth Branagh",
        runtime: "1h 45min",
        score: 6.9,
        show: 'y',
        desc: "When her father unexpectedly dies, young Ella finds herself at the mercy of her cruel stepmother and her scheming stepsisters. Never one to give up hope, Ella's fortunes begin to change after meeting a dashing stranger."
    },
    {
        name: "Kimi no na wa",
        image: "/images/movies/kimi/post-kimi.png",
        logo: "",
        trailer: "https://www.youtube.com/embed/mPsjLnEtJZI",
        genre: "Drama/Fantasy",
        director: "Makoto Shinkai",
        runtime: "1h 46min",
        score: 8.4,
        show: 'y',
        desc: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?"
    },
    {
        name: "Army of the Dead",
        image: "/images/movies/army/post-army.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/tI1JGPhYBS8",
        genre: "Action/Crime",
        director: "Zack Snyder",
        runtime: "2h 28min",
        score: 6.0,
        show: 'n',
        desc: "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted."
    },
    {
        name: "Ready or Not",
        image: "/images/movies/ready/post-ready.webp",
        logo: "",
        trailer: "https://www.youtube.com/embed/ZtYTwUxhAoI",
        genre: "Action/Horror",
        director: "Tyler Gillett",
        runtime: "1h 35min",
        score: 6.8,
        show: 'n',
        desc: "A bride's wedding night takes a sinister turn when her eccentric new in-laws force her to take part in a terrifying game."
    },
    {
        name: "Hellboy",
        image: "/images/movies/hellboy/post-hellboy.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/ZsBO4b3tyZg",
        genre: "Action/Fantasy",
        director: "Neil Marshall",
        runtime: "2h",
        score: 5.2,
        show: 'n',
        desc: "Based on the graphic novels by Mike Mignola, Hellboy, caught between the worlds of the supernatural and human, battles an ancient sorceress bent on revenge."
    },
    {
        name: "Fifty Shades of Grey",
        image: "/images/movies/fifty/post-fifty.jpg",
        logo: "",
        trailer: "https://www.youtube.com/embed/SfZWFDs0LxA",
        genre: "Drama/Romance",
        director: "Sam Taylor-Johnson",
        runtime: "2h 5min",
        score: 4.1,
        show: 'n',
        desc: "Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey."
    },
]



function seedDB(){
    Movies.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Remove DB Complete");
            data.forEach(function(seed){
                Movies.create(seed, function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('New data added');
                    }
                });
            });
        }
    });
    cinemas.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Remove Cinemas Complete");
            cinemasdata.forEach(function(seed){
                cinemas.create(seed, function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Cinemas data added');
                    }
                });
            });
        }
    });
}

module.exports = seedDB;