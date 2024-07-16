builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.T("date and time"));
builder.SaveFile("xlsx", "T.xlsx");
builder.CloseFile();