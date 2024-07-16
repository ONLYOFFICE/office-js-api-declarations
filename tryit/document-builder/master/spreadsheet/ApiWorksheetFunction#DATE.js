builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DATE(2018, 3, 16));
builder.SaveFile("xlsx", "DATE.xlsx");
builder.CloseFile();