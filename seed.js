var mongoose = require('mongoose');
var Movies = require('./models/movies.js');
var cinemas = require('./models/cinemas.js');

var cinemasdata = [
    {
        name: "Imove Paragon",
        image: "https://media.discordapp.net/attachments/718002735475064874/846390549870673950/image1.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Paragon, 5th floor.",
        num: "1"
    },
    {
        name: "Imove Iconsiam",
        image: "https://media.discordapp.net/attachments/718002735475064874/846390549723742218/image0.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Iconsiam, 5th floor.",
        num: "2"
    },
    {
        name: "Imove WestGate",
        image: "https://media.discordapp.net/attachments/718002735475064874/846390549723742218/image0.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at CentralPlaza WestGate, 5th floor.",
        num: "3"
    },
    {
        name: "Imove Pinklao",
        image: "https://media.discordapp.net/attachments/718002735475064874/846390549870673950/image1.jpg",
        desc: "The ultimate landscape of entertainment culture.  Experience a superior movie theater at Pinklao, 5th floor.",
        num: "4"
    },
    
]

var data = [
    {
        name: "Joker",
        image: "https://files.gqthailand.com/uploads/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aaa79357-9476-4c1d-b9a8-6e881f2449d3/ddf2d7e-bcfd0bdb-461b-4dd2-b93c-1dcd68208788.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhYTc5MzU3LTk0NzYtNGMxZC1iOWE4LTZlODgxZjI0NDlkM1wvZGRmMmQ3ZS1iY2ZkMGJkYi00NjFiLTRkZDItYjkzYy0xZGNkNjgyMDg3ODgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UevkE3C2Dk2StjdI16y2Ew17AmbU0rOKrfdoDtbCEGs",
        trailer: "https://www.youtube-nocookie.com/embed/zAGVQLHvwOY",
        genre: "Crime/Thriller",
        director: "Todd Phillips",
        runtime: "2h 2min",
        score: 8.4,
        show: 'y'
        // desc: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker."
    },
    {
        name: "Jurassic World: Fallen Kingdom",
        image: "https://www.movieartarena.com/imgs/jurassicworld2bb.jpg",
        logo: "https://inwfile.com/s-dz/0qjre3.png",
        trailer: "https://www.youtube-nocookie.com/embed/vn9mMeWcgoM",
        genre: "Action/Adventure",
        director: "J.A. Bayona",
        runtime: "2h 8 min",
        score: 6.2,
        show: 'y'
    },
    {
        name: "Happy Old Year",
        image: "https://www.siamzone.com/movie/pic/2019/happyoldyear/poster2.jpg",
        logo: "https://media.discordapp.net/attachments/718002735475064874/841683191520690186/IMG_3227.PNG?width=1440&height=507",
        trailer: "https://www.youtube-nocookie.com/embed/V0PrIr9GK54",
        genre: "Drama/Romance",
        director: "Nawapol Thamrongrattanarit",
        runtime: "1h 53min",
        score: 7.2,
        show: 'y'
    },
    {
        name: "Aquaman",
        image: "https://f.ptcdn.info/764/061/000/pkr9iz82udBTbj1PMGHl-o.jpg",
        logo: "https://media.discordapp.net/attachments/718002735475064874/841685080585928704/image0.png?width=670&height=670",
        trailer: "https://www.youtube.com/embed/WDkg3h8PCVU",
        genre: "Action/Adventure",
        director: "James Wan",
        runtime: "2h 23min",
        score: 6.9,
        show: 'y'
    },
    {
        name: "Venom",
        image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/65425a1c-1d61-429b-bfa0-7dc046b30c9e/dcjqpdu-a6a6f77d-9cb1-4939-a692-2cb4b2a33454.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY1NDI1YTFjLTFkNjEtNDI5Yi1iZmEwLTdkYzA0NmIzMGM5ZVwvZGNqcXBkdS1hNmE2Zjc3ZC05Y2IxLTQ5MzktYTY5Mi0yY2I0YjJhMzM0NTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.z_1OR0-hfloxHo1PzrlkA3mplCj34Nw-WBHE3hiUC28",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dddb8beb-7509-4c66-bc59-5e64fc25d614/dc2kdbo-23cebbbb-db46-488b-9729-9e968f06bec0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RkZGI4YmViLTc1MDktNGM2Ni1iYzU5LTVlNjRmYzI1ZDYxNFwvZGMya2Riby0yM2NlYmJiYi1kYjQ2LTQ4OGItOTcyOS05ZTk2OGYwNmJlYzAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NqsS3kJf8LM6kJapuvOrZ6oow-m9jmGo4D12Ou1KLLQ",
        trailer: "https://www.youtube-nocookie.com/embed/u9Mv98Gr5pY",
        genre: "Action/Adventure",
        director: "Ruben Fleischer",
        runtime: "1h 52min",
        score: 6.7,
        show: 'y'
    },
    {
        name: "The Conjuring 2",
        image: "http://f.ptcdn.info/275/043/000/o8ahhndc6ZdU70SImbk-o.jpg",
        logo: "",
        trailer: "",
        genre: "Horror/Thriller",
        director: "James Wan",
        runtime: "2h 14min",
        score: 7.3,
        show: 'y'
    },
    {
        name: "Don't Breathe",
        image: "https://images-na.ssl-images-amazon.com/images/I/41QsBqbdIqL._AC_.jpg",
        logo: "",
        trailer: "",
        genre: "Horror/Thriller",
        director: "Fede Alvarez",
        runtime: "1h 28min",
        score: 7.1,
        show: 'y'
    },
    {
        name: "Forrest Gump",
        image: "https://images-na.ssl-images-amazon.com/images/I/718o2FI-a0L._AC_SL1500_.jpg",
        logo: "",
        trailer: "",
        genre: "Drama/Romance",
        director: "Robert Zemeckis",
        runtime: "2h 22min",
        score: 8.8,
        show: 'y'
    },
    {
        name: "Cinderella",
        image: "https://i.pinimg.com/originals/f4/b3/c0/f4b3c0ddb1f955ec9519b7881fc01a4b.jpg",
        logo: "",
        trailer: "",
        genre: "Drama/Fantasy",
        director: "Kenneth Branagh",
        runtime: "1h 45min",
        score: 6.9,
        show: 'y'
    },
    {
        name: "Kimi no na wa",
        image: "http://f.ptcdn.info/230/047/000/ogmwiahht5LuOo91uom-o.png",
        logo: "",
        trailer: "",
        genre: "Drama/Fantasy",
        director: "Makoto Shinkai",
        runtime: "1h 46min",
        score: 8.4,
        show: 'y'
    },
    {
        name: "Army of the Dead",
        image: "https://m.media-amazon.com/images/M/MV5BNGY0NzgzYzctYWQwMC00MzM2LThjNGMtZjFjMWUyNzg0ZmM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        logo: "",
        trailer: "",
        genre: "Action/Crime",
        director: "Zack Snyder",
        runtime: "2h 28min",
        score: 6.0,
        show: 'n'
    },
    {
        name: "Ready or Not",
        image: "https://gdb.voanews.com/208F2198-2B0C-4A64-93F4-691B3E9675E8_w408_r0_s.jpg",
        logo: "",
        trailer: "",
        genre: "Action/Horror",
        director: "Tyler Gillett",
        runtime: "1h 35min",
        score: 6.8,
        show: 'n'
    },
    {
        name: "Hellboy",
        image: "https://images-na.ssl-images-amazon.com/images/I/812rYT9RviL._AC_SL1500_.jpg",
        logo: "",
        trailer: "",
        genre: "Action/Fantasy",
        director: "Neil Marshall",
        runtime: "2h",
        score: 5.2,
        show: 'n'
    },
    {
        name: "Fifty Shades of Grey",
        image: "https://i.pinimg.com/originals/2c/d3/06/2cd306719f764c4b2572a52d63b26606.jpg",
        logo: "",
        trailer: "",
        genre: "Drama/Romance",
        director: "Sam Taylor-Johnson",
        runtime: "2h 5min",
        score: 4.1,
        show: 'n'
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