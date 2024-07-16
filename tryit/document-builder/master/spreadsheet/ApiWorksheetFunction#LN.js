builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.LN(23));
builder.SaveFile("xlsx", "LN.xlsx");
builder.CloseFile();