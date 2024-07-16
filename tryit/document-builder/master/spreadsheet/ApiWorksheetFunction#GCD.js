builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.GCD(28, 16, 878, 800, 1650, 2000));
builder.SaveFile("xlsx", "GCD.xlsx");
builder.CloseFile();