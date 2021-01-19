export const currentUser = {
    id: 1234,
    profileImg: "human-profile.png",
    name: "Maya the Villager",
    birthday: "June 13th",
}

export const users = {
    1: {
        profileImg: "al-profile.png",
        name: "Al",
    },
    2: {
        profileImg: "alice-profile.png",
        name: "Alice",
    },
    3: {
        profileImg: "cleo-profile.png",
        name: "Cleo",
    },
    4: {
        profileImg: "hamlet-profile.png",
        name: "Hamlet",
    },
    [currentUser.id]: currentUser,
}

export const posts = [
    {
        id: "post1",
        userId: 1,
        content: "Just did a million push ups today, feeling great!",
        img: "",
        datePosted: "December 16, 2020 9:30",
        like: false,
        comments: [
            {
                userId: 1,
                content: "I meant to say TWO MILLION whoops 😏",
                datePosted: "December 16, 2020 11:30",
            }
        ]
    },
    {
        id: "post2",
        userId: 2,
        content: "Felt cute, might delete later",
        img: "alice-post.png",
        datePosted: "December 16, 2020 9:00",
        like: false,
        comments: []
    },
    {
        id: "post3",
        userId: 3,
        content: "I'm so sad it's the wrong color... 😔",
        img: "",
        datePosted: "December  15, 2020 15:40",
        like: false,
        comments: [
            {
                userId: 4,
                content: "You can just try ordering from Nooks again!",
                datePosted: "December 15, 2020 19:30",
            },
            {
                userId: 3,
                content: "I know, I did, but I was so excited 😞",
                datePosted: "December 15, 2020 19:35",
            }
        ]
    },
    {
        id: "post4",
        userId: 4,
        content: "My hamster hammy is the buffest hamster of them all! Be Jelly!!",
        img: "hamlet-post.jpg",
        datePosted: "December 15, 2020 15:00",
        like: false,
        comments: []
    },
    {
        id: "post5",
        userId: 3,
        content: "MY FURNITURE I ORDERED FROM NOOKS CAME!! AAAH I'M SO EXCITED",
        img: "",
        datePosted: "December 15, 2020 15:15",
        like: false,
        comments: []
    },
];