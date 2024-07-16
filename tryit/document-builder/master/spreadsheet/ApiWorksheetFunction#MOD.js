builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.MOD(65, 7));
builder.SaveFile("xlsx", "MOD.xlsx");
builder.CloseFile();