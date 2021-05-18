$(function() {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var name = $("#updateTitle").val();
    var email = $("#updateBody").val();
    if(!email.includes(".com") || !email.includes("@"))
    {
      alert("Incorrect Email")
      return;
    }
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      data: { name, email },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://jsonplaceholder.typicode.com/users/" + id, function(
    response
  ) {
    $("#updateId").val(response.id);
    $("#updateTitle").val(response.name);
    $("#updateBody").val(response.email);
    $("#updateModal").modal("show");
  });
}
function addRecipe() {
  var name = $("#title").val();
  var email = $("#body").val();

  if(!email.includes(".com") || !email.includes("@"))
  {
    alert("Incorrect Email")
    return;
  }
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "POST",
    data: { name, email },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec.id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.email}</p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}
