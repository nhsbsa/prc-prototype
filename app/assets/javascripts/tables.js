$(document).ready(function () {
	// grab tables summary attribute
	var tableSummary = $("#simpleTable").attr("summary");

	// hide caption tag
	$("#simpleTable caption").hide();

	// attach table sorter plug-in (jquery.tablesorter.js)
	$("#simpleTable").tablesorter();

	// table header functions
	$("thead th a").click(function () {

		// establish header text and set aria sort attribute
		$("thead th a").each(function () {
			var linkIDName = (this).id.split("|");
			(this).innerHTML = linkIDName[0];
			$(this).parent().attr("aria-sort", "none");
		});

		// grab link id and sort order
		var linkID = (this).id.split("|");

		/* re-establish caption, header link title attribute and aria sort attribute
		linkID[0] = header link text, linkID[1] = sort text */
		if (linkID[1] == "asc") {
			$(this).attr("title", "Sort " + linkID[0] + " descending");
			(this).id = linkID[0] + "|desc";
			$(this).parent().attr("aria-sort", "ascending");
			$("#simpleTable caption")[0].innerHTML = "Search results sorted by " + linkID[0] + ": Ascending order";
			$("#simpleTable caption").show();
		}
		else {
			$(this).attr("title", "Sort " + linkID[0] + " ascending");
			(this).id = linkID[0] + "|asc";
			$(this).parent().attr("aria-sort", "descending");
			$("#simpleTable caption")[0].innerHTML = "Search results sorted by " + linkID[0] + ": Descending order";
			$("#simpleTable caption").show();
		}
	});
});