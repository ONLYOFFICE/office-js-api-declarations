builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.YIELDDISC("1/10/2018", "11/20/2019", 90, 100));
builder.SaveFile("xlsx", "YIELDDISC.xlsx");
builder.CloseFile();