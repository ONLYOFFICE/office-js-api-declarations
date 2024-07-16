builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ERF(-2));
builder.SaveFile("xlsx", "ERF.xlsx");
builder.CloseFile();