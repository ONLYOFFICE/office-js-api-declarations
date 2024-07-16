builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.EFFECT(0.57, 4));
builder.SaveFile("xlsx", "EFFECT.xlsx");
builder.CloseFile();