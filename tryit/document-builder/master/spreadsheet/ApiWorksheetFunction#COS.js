builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COS(1.5));
builder.SaveFile("xlsx", "COS.xlsx");
builder.CloseFile();