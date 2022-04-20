$(document).ready(function () {
    $("#menu").click(function () {
        $("#sidenav").toggle("flex");
    })
    $(".trend-title").click(function (event) {
        const parent = $(event.target).closest(".trend-title");
        $(parent).siblings(".trend-tags").slideToggle("fast");
        $(parent).children(".icon").toggleClass("fa-chevron-up");
        $(parent).children(".icon").toggleClass("fa-chevron-down");
    })
    $(window).resize(function () {
        if ($(this).width() < 700)
            $("#sidenav").hide();
    })
})