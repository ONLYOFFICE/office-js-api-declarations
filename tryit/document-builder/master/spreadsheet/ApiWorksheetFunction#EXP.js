builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.EXP(5));
builder.SaveFile("xlsx", "EXP.xlsx");
builder.CloseFile();