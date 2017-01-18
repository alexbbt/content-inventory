var main = function() {
    var sites = localStorage.getItem("sites");
    sites = JSON.parse(sites);

    document.getElementById("csv_preview").innerHTML = "";
    document.getElementById("csv_preview").append(toCSV(sites));

    document.getElementById("json_preview").innerHTML = JSON.stringify(sites, null, 2);

    document.getElementById("table_preview").innerHTML = "";
    document.getElementById("table_preview").append(toTable(sites));
}

document.getElementById("clear-all").addEventListener("click", function() {
    localStorage.setItem(Date.now(), localStorage.getItem("sites"));
    localStorage.setItem("sites", "[]");
    main();
})

var toCSV = function(list) {
    if (list.length == 0) {
        list.push({});
    }

    var csv = ""

    var keys = Object.keys(list[0]);
    csv += keys.toString() + "\n";

    list.forEach(function(row) {
        values = [];
        keys.forEach(function(key) {
            values.push(row[key]);
        });
        csv += values.join(",") + "\n";
    })

    var textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "500px";
    textarea.append(csv);

    return textarea;
}

var toTable = function(list) {
    if (list.length == 0) {
        list.push({});
    }

    var table = document.createElement("table");
    table.classList.add("table", "table-striped")

    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    var keys = Object.keys(list[0]);
    var tr = document.createElement("tr");
    keys.forEach(function(key) {
        var th = document.createElement("th");
        th.innerText = key;
        tr.append(th);
    });
    thead.append(tr);

    list.forEach(function(row) {
        var tr = document.createElement("tr");
        keys.forEach(function(key) {
            var td = document.createElement("td");
            td.innerText = row[key];
            tr.append(td);
        });
        tbody.append(tr);
    })
    table.append(thead);
    table.append(tbody);

    return table;
}

main()
