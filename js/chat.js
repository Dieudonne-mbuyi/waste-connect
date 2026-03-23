function sendMessage() {

    const input = document.getElementById("messageInput")

    const chatBox = document.getElementById("chatBox")

    if (input.value.trim() === "") return

    chatBox.innerHTML +=

        "<p><strong>Vous :</strong> " + input.value + "</p>"

    input.value = ""

    chatBox.scrollTop = chatBox.scrollHeight

}