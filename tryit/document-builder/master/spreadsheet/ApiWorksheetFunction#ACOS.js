builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ACOS(0));
builder.SaveFile("xlsx", "ACOS.xlsx");
builder.CloseFile();