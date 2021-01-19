const currentUser = {
    id: 1234,
    profileImg: "human-profile.png",
    name: "Maya the Villager",
    birthday: "June 13th",
}

const users = {
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

const posts = [
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

main();

function main() {
    generatePosts();
    setInputFunctionality();
    setCritterpediaFunctionality();
    setCurrentUserInfo();
}

function setCurrentUserInfo() {
    const profileImg = document.querySelector("#current-user");
    profileImg.style.backgroundImage = "url(\'./img/profile/" + currentUser.profileImg + "\')";
    const profileDetails = document.querySelectorAll(".user-container li");
    profileDetails[0].innerText = currentUser.name;
    profileDetails[1].querySelector("span").innerText = currentUser.birthday;
}

function setCritterpediaFunctionality() {
    const critterBtn = document.getElementById("critter-btn");
    const critterContainer = document.querySelector(".critter-container > div:nth-of-type(1)");
    const loading = document.querySelector(".loading");
    critterBtn.addEventListener("click", async function() {
        critterContainer.innerHTML = "";
        critterContainer.classList.add("hidden");
        loading.classList.remove("hidden");
        const critter = await fetchRandomCritter();
        critterContainer.innerHTML = 
            `<img src="${critter.image_uri}" alt="${critter.name["name-USen"]} photo" />`
            + `<p>${critter.name["name-USen"]}</p>`; 
        critterContainer.classList.remove("hidden");
        loading.classList.add("hidden");
        document.getElementById("recent-caught").innerText = critter.name["name-USen"];
    });
}

// Fetches and returns a random critter information from the AC API
async function fetchRandomCritter() {
    let critterType = "fish";
    if (Math.round(Math.random()) === 1) {
        critterType = "bugs";
    }
    const randomId = Math.round(Math.random() * 50) + 1;
    let critter = fetch('https://acnhapi.com/v1/' + critterType + '/' + randomId)
    .then(function(data) {
        return data.json();
    })
    .catch(function(e) {
        console.error(e);
    });
    return critter;
}

function setInputFunctionality() {
    const input = document.querySelector(".post-input input");
    const postBtn = document.getElementById("post-btn");
    input.addEventListener("input", function(e) {
        postBtn.disabled = e.target.value.length === 0;
    });
    postBtn.addEventListener("click", function() {
        makeNewPost(input.value);
        generatePosts();
    });
}

function makeNewPost(content) {
    const currentDate = new Date();
    const newPost = {
        id: ("post" + posts.length),
        userId: currentUser.id,
        content: content,
        img: "",
        datePosted: currentDate,
        like: false,
        comments: []
    }
    posts.push(newPost);

    document.getElementById("post-count").textContent = 
        parseInt(document.getElementById("post-count").textContent) + 1;
}

function formateDate(postDate) {
    const dateObj = new Date(postDate);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour12: false 
    };
    return dateObj.toLocaleString('en-US', options);
}

function createPost(info) {
    let postContainer = document.createElement("div");
    const userInfo = users[info.userId];
    const profileImg = "background-image:url(\'.//img//profile//" + userInfo.profileImg + "\')";
    let img = ``;
    if (info.img !== "") {
        img = `<img src="./img/post/${info.img}" alt="${userInfo.name + " post image"}" />`
    }
    let commentAvailable = "fas";
    if (info.comments.length === 0) {
        commentAvailable = "far";
    }
    postContainer.innerHTML = 
        `<div class="post">`
            + `<div class="profile-img" style="${profileImg}">&nbsp;</div>`
            + `<div class="post-content">`
                + `<p class="bold">${userInfo.name}</p>`
                + `<p>${formateDate(info.datePosted)}</p>`
                + `<p>${info.content}</p>`
            + `</div>`
            + img
            + `<div class="post-actions">`
                + `<i class="fas fa-ellipsis-v"></i>`
                + `<i class="far fa-heart action-like"></i>`
                + `<i class="${commentAvailable} fa-comments action-comment"></i>`
            + `</div>`
        + `</div>`
        + `<div class="post-comments hidden">`
        + `</div>`;

    // Generate post comments
    const commentsContainer = postContainer.querySelector(".post-comments");
    generateComments(commentsContainer, info.comments);

    // Add functionality to action buttons
    addLikeFunctionality(postContainer, info);
    addCommentFunctionality(postContainer, info);

    return postContainer;
}

function addLikeFunctionality(postContainer, info) {
    const heartAction = postContainer.querySelector(".action-like");
    heartAction.addEventListener("click", function() {
        info.like = !info.like;
        heartAction.classList.toggle("fas");
        heartAction.classList.toggle("far");
        const likeSpan = document.getElementById("like-count");
        if (info.like) {
            likeSpan.textContent = 
                parseInt(likeSpan.textContent) + 1;
        } else {
            likeSpan.textContent = 
                parseInt(likeSpan.textContent) - 1;
        }
    });
}

function addCommentFunctionality(postContainer, info) {
    const commentsContainer = postContainer.querySelector(".post-comments");
    const commentAction = postContainer.querySelector(".action-comment");
    commentAction.addEventListener("click", function() {
        commentsContainer.classList.toggle("hidden");
    });
}

function generateComments(commentsContainer, comments) {
    comments.sort(sortByPostedAsc);

    comments.forEach((commentInfo) => {
        const commentElement = createComment(commentInfo);
        commentsContainer.appendChild(commentElement);
    });
}

function createComment(info) {
    let commentContainer = document.createElement("div");
    const userInfo = users[info.userId];
    const profileImg = "background-image:url(\'.//img//profile//" + userInfo.profileImg + "\')";
    commentContainer.innerHTML = 
        `<div class="comment">`
            + `<div class="profile-img" style="${profileImg}">&nbsp;</div>`
            + `<div class="comment-content">`
                + `<p class="bold">${userInfo.name}</p>`
                + `<p>${info.content}</p>`
                + `<p>${formateDate(info.datePosted)}</p>`
            + `</div>`
        + `</div>`;
    return commentContainer;
}

// Generates posts on the page
function generatePosts() {
    const postsContainer = document.querySelector(".posts");
    postsContainer.innerHTML = ""; // clears post container

    posts.sort(sortByPostedDesc);

    posts.forEach(function(post) {
        const postElement = createPost(post);
        postsContainer.appendChild(postElement);
    });
}

function sortByPostedDesc(postA, postB) {
    const dateA = new Date(postA.datePosted);
    const dateB = new Date(postB.datePosted);
    return  dateB - dateA;
}

function sortByPostedAsc(postA, postB) {
    return sortByPostedDesc(postB, postA);
}