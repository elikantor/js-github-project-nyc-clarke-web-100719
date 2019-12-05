window.addEventListener("load", function(event){
    const searchForm = document.querySelector("#github-form")
    const userList = document.querySelector("#user-list")
    const reposList = document.querySelector("#repos-list")

    searchForm.addEventListener("submit", function(event){
        event.preventDefault()
        let input = searchForm.elements["search"].value
        displayUsers(input)
    })

    function displayUsers(name){
        userList.innerHTML = ""
        return fetch(`https://api.github.com/search/users?q=${name}`, {
            headers: {Accept: "application/vnd.github.v3+json"}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            data.items.forEach(function(ele){
                userList.innerHTML +=
                    `<div><h3> ${ele.login} </h3>
                    <img style="height: 100px; width: 100px" src="${ele.avatar_url}"><br>
                    <a href="${ele.html_url}">Profile Link</a></div>`
            })
        })
    }

    userList.addEventListener("click", function(event){
        let user = event.target.closest('div').querySelector('h3').innerText
        displayRepos(user)
    })

    function displayRepos(user){
        reposList.innerHTML = ""
        return fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => response.json())
        .then(function(data){
            reposList.innerHTML = 
                    `<h2>${user}'s Github Repos</h2>`
            data.forEach(function(ele){
                reposList.innerHTML += 
                    `<a href="${ele.html_url}">${ele.html_url}</a>`
            })
        })
    }

})
