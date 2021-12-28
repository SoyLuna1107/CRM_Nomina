document.addEventListener("DOMContentLoaded", (e) => {
    const id = document.getElementById("username").textContent;
    console.log(id);
  
    postData("/nomina/getUsername", {id}).then((res) => {
    //   console.log(res.PER_CNIVEL);
  
    });
  });
  