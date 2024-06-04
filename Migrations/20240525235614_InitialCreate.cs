using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gps_jamming_classifier_be.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spectrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    SignalDataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spectrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spectrograms_SignalDatas_SignalDataId",
                        column: x => x.SignalDataId,
                        principalTable: "SignalDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spectrograms_SignalDataId",
                table: "Spectrograms",
                column: "SignalDataId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spectrograms");
        }
    }
}
