const tabs = document.querySelectorAll(".menu button");

const forms = {
  postear: document.getElementById("Posts"),
  productos: document.getElementById("Products"),
  eventos: document.getElementById("Events"),
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
  
    tabs.forEach((btn) => btn.classList.remove("active"));

    
    tab.classList.add("active");

    
    const target = tab.id.split("-")[1]; 
    Object.values(forms).forEach((form) => form.classList.remove("active"));
    if (forms[target]) {
      forms[target].classList.add("active");
    }
  });
});

