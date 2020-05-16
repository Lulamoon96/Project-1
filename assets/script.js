var queryURL = "https://api.edamam.com/search?q=chicken&app_id=ee9aaaa5&app_key=60bd104228a51c57d3cdbfc4e2822a63"


$.ajax({

    url: queryURL,
    method: "GET"

}).then(function(response) {

    console.log(response)

})
// $('#recipeModal').on('shown.bs.modal', function () {
//     $('#findRecipes').trigger('focus')
//   })