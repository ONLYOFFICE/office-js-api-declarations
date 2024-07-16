builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SYD(3500, 500, 5, 3));
builder.SaveFile("xlsx", "SYD.xlsx");
builder.CloseFile();