button = document.getElementById("cc-button")
color = document.getElementById("color-site")

index = 1
function change_color() {
    emojis = ["☀️","🌙","🍀"]
    document.getElementById("cc-text").innerHTML = emojis[index]
    color.href = `/src/css/style${index+1}.css`
    index+=1
    if (index == 3){
        index = 0
    }
}
button.addEventListener("click", () => {change_color()})
