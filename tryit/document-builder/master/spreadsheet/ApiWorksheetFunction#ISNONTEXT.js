builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ISNONTEXT("#N/A"));
oWorksheet.GetRange("A2").SetValue(oFunction.ISNONTEXT(255));
oWorksheet.GetRange("A3").SetValue(oFunction.ISNONTEXT("Online Office"));
builder.SaveFile("xlsx", "ISNONTEXT.xlsx");
builder.CloseFile();