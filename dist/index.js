document.addEventListener("DOMContentLoaded", function () {
    // Elements
    var resumeSection = document.getElementById("resume");
    var formSection = document.getElementById("resumeWrapper"); // Updated reference
    var generateResumeBtn = document.getElementById("generateResumeBtn");
    var resumeForm = document.getElementById("resumeForm"); // Correct reference to the form
    var editResumeBtn = document.getElementById("editResumeBtn");
    var emailShareBtn = document.getElementById("emailShareBtn");
    var profileImageInput = document.getElementById("profileImageInput");
    var profileImageDisplay = document.getElementById("profileImageDisplay");
    // Check if there's any data in localStorage
    var storedData = localStorage.getItem("resumeData");
    if (storedData) {
        // If data exists in localStorage, show the stored resume
        var data = JSON.parse(storedData);
        updateResume(data);
    }
    else {
        // If no data exists in localStorage, show the default resume
        resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.remove("hidden");
        formSection === null || formSection === void 0 ? void 0 : formSection.classList.add("hidden");
    }
    emailShareBtn === null || emailShareBtn === void 0 ? void 0 : emailShareBtn.addEventListener("click", function () {
        var resumeContent = document.getElementById("resume");
        if (resumeContent) {
            var resumeData = resumeContent.innerText || resumeContent.innerHTML;
            var subject = "Check Out My Resume";
            var body = "Hi, check out my resume: \n\n".concat(resumeData);
            // Open Gmail in a new window with pre-filled subject and body
            var gmailComposeURL = "https://mail.google.com/mail/?view=cm&fs=1&to=&su=".concat(encodeURIComponent(subject), "&body=").concat(encodeURIComponent(body));
            window.open(gmailComposeURL, "_blank");
        }
    });
    // Show form when "Generate Resume" is clicked
    generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.addEventListener("click", function () {
        resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.add("hidden");
        formSection === null || formSection === void 0 ? void 0 : formSection.classList.remove("hidden");
        generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.classList.add("hidden");
    });
    // Handle form submission
    resumeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Get form data
        var formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            education: document.getElementById("degree").value,
            institution: document.getElementById("institution")
                .value,
            experience: document.getElementById("jobTitle")
                .value,
            company: document.getElementById("company").value,
            skills: document.getElementById("skills").value
                .split(",")
                .map(function (skill) { return skill.trim(); }),
            profileImage: profileImageDisplay.src, // Include profile image URL
        };
        // Save data to localStorage
        localStorage.setItem("resumeData", JSON.stringify(formData));
        // Update resume with form data
        updateResume(formData);
        // Hide form and show resume
        formSection === null || formSection === void 0 ? void 0 : formSection.classList.add("hidden");
        resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.remove("hidden");
    });
    // Function to update the resume with form data
    function updateResume(data) {
        var nameElement = document.querySelector("#resume h1");
        nameElement.innerText = data.name;
        var emailElement = document.querySelector("#resume p");
        emailElement.innerText = data.email;
        var phoneElement = document.querySelector("#resume p:nth-of-type(2)");
        phoneElement.innerText = data.phone;
        var skillsList = document.querySelector("#skillsSection ul");
        skillsList.innerHTML = ""; // Clear existing skills
        data.skills.forEach(function (skill) {
            var li = document.createElement("li");
            li.innerText = skill;
            skillsList.appendChild(li);
        });
        var educationElement = document.querySelector("#education h3");
        educationElement.innerText = data.education;
        var experienceElement = document.querySelector("#experience h3");
        experienceElement.innerText = data.experience;
        // Update profile image
        if (profileImageDisplay) {
            profileImageDisplay.src = data.profileImage || "./assets/myProfile.webp";
        }
    }
    // Edit resume button logic
    editResumeBtn === null || editResumeBtn === void 0 ? void 0 : editResumeBtn.addEventListener("click", function () {
        var _a;
        resumeSection === null || resumeSection === void 0 ? void 0 : resumeSection.classList.add("hidden");
        formSection === null || formSection === void 0 ? void 0 : formSection.classList.remove("hidden");
        var data = JSON.parse(localStorage.getItem("resumeData") || "{}");
        document.getElementById("name").value =
            data.name || "";
        document.getElementById("email").value =
            data.email || "";
        document.getElementById("phone").value =
            data.phone || "";
        document.getElementById("degree").value =
            data.education || "";
        document.getElementById("institution").value =
            data.institution || "";
        document.getElementById("jobTitle").value =
            data.experience || "";
        document.getElementById("company").value =
            data.company || "";
        document.getElementById("skills").value =
            ((_a = data.skills) === null || _a === void 0 ? void 0 : _a.join(", ")) || "";
        profileImageDisplay.src = data.profileImage || "./assets/myProfile.webp";
        generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.classList.remove("hidden");
    });
    // Handle profile image input
    profileImageInput === null || profileImageInput === void 0 ? void 0 : profileImageInput.addEventListener("change", function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                if (profileImageDisplay) {
                    profileImageDisplay.src = reader_1.result;
                }
            };
            reader_1.readAsDataURL(file);
        }
    });
});
