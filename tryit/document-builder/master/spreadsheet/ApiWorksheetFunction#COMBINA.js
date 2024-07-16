builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COMBINA(7, 2));
builder.SaveFile("xlsx", "COMBINA.xlsx");
builder.CloseFile();