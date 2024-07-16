builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ids = ["ID", 1, 2, 3, 4, 5];
var clients = ["Client", "John Smith", "Ella Tompson", "Mary Shinoda", "Lily-Ann Bates", "Clara Ray"];
var phones = ["Phone number", "12054097166", "13343943678", "12568542099", "12057032298", "12052914781"];

for (var i = 0; i < ids.length; i++) {
    oWorksheet.GetRange("A" + (i + 1)).SetValue(ids[i]);
}
for (var j = 0; j < clients.length; j++) {
    oWorksheet.GetRange("B" + (j + 1)).SetValue(clients[j]);
}
for (var n = 0; n < phones.length; n++) {
    oWorksheet.GetRange("C" + (n + 1)).SetValue(phones[n]);
}

oWorksheet.GetRange("C1").SetColumnWidth(15);
oWorksheet.GetRange("F1").SetColumnWidth(15);
oWorksheet.GetRange("B1").SetColumnWidth(15);
oWorksheet.GetRange("E1").SetColumnWidth(15);

oWorksheet.GetRange("E1").SetValue("Name");
oWorksheet.GetRange("E2").SetValue("Ella Tompson");
oWorksheet.GetRange("F1").SetValue("Phone number");
var oRange1 = oWorksheet.GetRange("B2:B6");
var oRange2 = oWorksheet.GetRange("C2:C6");
oWorksheet.GetRange("F2").SetValue(oFunction.LOOKUP("Ella Tompson", oRange1, oRange2));

oWorksheet.GetRange("E3").SetValue("John Smith");
var oRange3 = oWorksheet.GetRange("A1:C6");
oWorksheet.GetRange("F3").SetValue(oFunction.HLOOKUP("Phone number", oRange3, 2));

oWorksheet.GetRange("E4").SetValue("Clara Ray");
oWorksheet.GetRange("F4").SetValue(oFunction.VLOOKUP("Phone number", oRange3, 3));

var oRange4 = oWorksheet.GetRange("E2:E4");
oWorksheet.GetRange("E6").SetValue("Clients");
oWorksheet.GetRange("F6").SetValue(oFunction.COUNTA(oRange4));
builder.SaveFile("xlsx", "ApiWorksheetFunction.xlsx");
builder.CloseFile();