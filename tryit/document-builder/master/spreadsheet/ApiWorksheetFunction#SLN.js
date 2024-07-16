builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SLN(3500, 500, 5));
builder.SaveFile("xlsx", "SLN.xlsx");
builder.CloseFile();