document.getElementById("team-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve input values
    var email = document.getElementById("email").value;
    var teamName = document.getElementById("team-name").value;
    var teamSize = document.getElementById("team-size").value;
    var termsChecked = document.getElementById("terms").checked;

    // Create data object
    var data = {
        email: email,
        teamName: teamName,
        teamSize: teamSize,
        termsChecked: termsChecked
    };

    // Send data to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "upload-team.py", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server if needed
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
});