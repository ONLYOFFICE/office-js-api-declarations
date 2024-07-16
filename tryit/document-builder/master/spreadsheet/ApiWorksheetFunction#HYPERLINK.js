builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.HYPERLINK("https://example.com/files/example.xlsx", "Click here"));
builder.SaveFile("xlsx", "HYPERLINK.xlsx");
builder.CloseFile();