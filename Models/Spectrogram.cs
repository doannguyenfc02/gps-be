namespace gps_jamming_classifier_be.Models
{
    public class Spectrogram
    {
        public int Id { get; set; }
        public byte[] Data { get; set; }
        public string Description { get; set; }
        public int SignalDataId { get; set; }
        public SignalData SignalData { get; set; }
    }
}
