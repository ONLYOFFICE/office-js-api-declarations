builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.RADIANS(90));
builder.SaveFile("xlsx", "RADIANS.xlsx");
builder.CloseFile();