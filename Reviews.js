function openForm() {
  document.getElementById("popup").style.display = "block";
}
function closeForm() {
  document.getElementById("popup").style.display = "none";
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); 

  let comment = document.getElementById("comment").value;

  // عرض التعليق في Popup
    //   alert(`Name: ${name}\nEmail: ${email}\nComment: ${comment}`);
    document.getElementById("content-containar").innerHTML = `
                    <span
                      style="
                        color: #9ca4ab;
                        text-align: left;
                        font-size: small;
                        padding-bottom: 0.25rem;
                        font-weight: 400;
                        margin-right: 1rem;
                      "
                      >${comment}</span>;'

    `;


  // إعادة ضبط النموذج وإغلاق ال Popup
  document.getElementById("form").reset();
  document.getElementById("popup").style.display = "none";
});
