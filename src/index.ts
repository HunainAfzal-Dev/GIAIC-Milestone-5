document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const downloadResumeBtn = document.getElementById('downloadResumeBtn') as HTMLButtonElement;
  const resumeSection = document.getElementById("resume");
  const formSection = document.getElementById("resumeWrapper"); // Updated reference
  const generateResumeBtn = document.getElementById("generateResumeBtn");
  const resumeForm = document.getElementById("resumeForm") as HTMLFormElement; // Correct reference to the form
  const editResumeBtn = document.getElementById("editResumeBtn");
  const emailShareBtn = document.getElementById(
    "emailShareBtn"
  ) as HTMLButtonElement;

  const profileImageInput = document.getElementById(
    "profileImageInput"
  ) as HTMLInputElement;
  const profileImageDisplay = document.getElementById(
    "profileImageDisplay"
  ) as HTMLImageElement;
  // Check if there's any data in localStorage
  const storedData = localStorage.getItem("resumeData");
  if (storedData) {
    // If data exists in localStorage, show the stored resume
    const data = JSON.parse(storedData);
    updateResume(data);
  } else {
    // If no data exists in localStorage, show the default resume
    resumeSection?.classList.remove("hidden");
    formSection?.classList.add("hidden");
  }


  downloadResumeBtn?.addEventListener('click', () => {
    const resumeContent = document.getElementById('resume');
    if (resumeContent) {
      html2pdf()
        .from(resumeContent)
        .save('Resume.pdf'); // This will prompt the user to download the file
    }
  });
  

  emailShareBtn?.addEventListener("click", () => {
    const resumeContent = document.getElementById("resume");
    if (resumeContent) {
      const resumeData = resumeContent.innerText || resumeContent.innerHTML;
      
      const subject = "Check Out My Resume";
      const body = `Hi, check out my resume: \n\n${resumeData}`;
      
      // Open Gmail in a new window with pre-filled subject and body
      const gmailComposeURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailComposeURL, "_blank");
    }
  });
  


  // Show form when "Generate Resume" is clicked
  generateResumeBtn?.addEventListener("click", () => {
    resumeSection?.classList.add("hidden");
    formSection?.classList.remove("hidden");
    generateResumeBtn?.classList.add("hidden");
  });

  // Handle form submission
  resumeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      education: (document.getElementById("degree") as HTMLInputElement).value,
      institution: (document.getElementById("institution") as HTMLInputElement)
        .value,
      experience: (document.getElementById("jobTitle") as HTMLInputElement)
        .value,
      company: (document.getElementById("company") as HTMLInputElement).value,
      skills: (document.getElementById("skills") as HTMLInputElement).value
        .split(",")
        .map((skill) => skill.trim()),
      profileImage: profileImageDisplay.src, // Include profile image URL
    };

    // Save data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(formData));

    // Update resume with form data
    updateResume(formData);

    // Hide form and show resume
    formSection?.classList.add("hidden");
    resumeSection?.classList.remove("hidden");
  });

  // Function to update the resume with form data
  function updateResume(data: any) {
    const nameElement = document.querySelector("#resume h1")!;
    (nameElement as HTMLElement).innerText = data.name;

    const emailElement = document.querySelector("#resume p")!;
    (emailElement as HTMLElement).innerText = data.email;

    const phoneElement = document.querySelector("#resume p:nth-of-type(2)")!;
    (phoneElement as HTMLElement).innerText = data.phone;

    const skillsList = document.querySelector("#skillsSection ul")!;
    skillsList.innerHTML = ""; // Clear existing skills
    data.skills.forEach((skill: string) => {
      const li = document.createElement("li");
      li.innerText = skill;
      skillsList.appendChild(li);
    });

    const educationElement = document.querySelector("#education h3")!;
    (educationElement as HTMLElement).innerText = data.education;

    const experienceElement = document.querySelector("#experience h3")!;
    (experienceElement as HTMLElement).innerText = data.experience;

    // Update profile image
    if (profileImageDisplay) {
      profileImageDisplay.src = data.profileImage || "./assets/myProfile.webp";
    }
  }

  // Edit resume button logic
  editResumeBtn?.addEventListener("click", () => {
    resumeSection?.classList.add("hidden");
    formSection?.classList.remove("hidden");
    const data = JSON.parse(localStorage.getItem("resumeData") || "{}");
    (document.getElementById("name") as HTMLInputElement).value =
      data.name || "";
    (document.getElementById("email") as HTMLInputElement).value =
      data.email || "";
    (document.getElementById("phone") as HTMLInputElement).value =
      data.phone || "";
    (document.getElementById("degree") as HTMLInputElement).value =
      data.education || "";
    (document.getElementById("institution") as HTMLInputElement).value =
      data.institution || "";
    (document.getElementById("jobTitle") as HTMLInputElement).value =
      data.experience || "";
    (document.getElementById("company") as HTMLInputElement).value =
      data.company || "";
    (document.getElementById("skills") as HTMLInputElement).value =
      data.skills?.join(", ") || "";
    profileImageDisplay.src = data.profileImage || "./assets/myProfile.webp";
    generateResumeBtn?.classList.remove("hidden");
  });

  // Handle profile image input
  profileImageInput?.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        if (profileImageDisplay) {
          profileImageDisplay.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  });
});
