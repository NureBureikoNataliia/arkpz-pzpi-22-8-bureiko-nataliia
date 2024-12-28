using System;
using System.Drawing;
using System.Windows.Forms;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Timer = System.Windows.Forms.Timer;

namespace IoT
{
    public partial class IoTForm : Form
    {
        private Label lblDistance;
        private TrackBar trackBarDistance;
        private PictureBox ledIndicator;
        private Label lblAccess;
        private Timer accessTimer;
        private Timer surveyCheckTimer;
        private bool surveyCompleted = false;
        private readonly HttpClient httpClient;

        public IoTForm()
        {
            InitializeComponent();
            httpClient = new HttpClient();
            // Timer to check survey status every 3 seconds
            surveyCheckTimer = new Timer { Interval = 3000 }; // 3 seconds
            surveyCheckTimer.Tick += async (s, e) => await CheckSurveyAutomatically();
            surveyCheckTimer.Start();
        }

        private void TrackBarDistance_Scroll(object sender, EventArgs e)
        {
            int distance = trackBarDistance.Value;
            lblDistance.Text = $"Distance: {distance} cm";

            if (distance <= 100)
            {
                ledIndicator.BackColor = Color.Green; // Turn on LED
                this.BackColor = Color.White; // Maximum brightness
            }
            else
            {
                ledIndicator.BackColor = Color.Gray; // Turn off LED
                this.BackColor = SystemColors.Control; // Default brightness
            }
        }

        private void AccessTimer_Tick(object sender, EventArgs e)
        {
            lblAccess.Text = "Access: Locked";
            surveyCompleted = false;
            accessTimer.Stop();
        }

        private async Task CheckSurveyAutomatically()
        {
            int distance = trackBarDistance.Value;

            if (distance > 100)
            {
                lblAccess.Text = "Access: Locked";
                return;
            }

            if (surveyCompleted) return; // Skip if survey is already completed

            try
            {
                surveyCompleted = await CheckSurveyStatusAsync();

                if (surveyCompleted)
                {
                    lblAccess.Text = "Access: Granted";
                    accessTimer.Start();
                }
                else
                {
                    lblAccess.Text = "Access: Locked";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error communicating with server: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        private async Task<bool> CheckSurveyStatusAsync()
        {
            try
            {
                HttpResponseMessage response = await httpClient.GetAsync("http://localhost:3000/completed-surveys");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<bool>(responseBody);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error communicating with server: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
        }

    }
}
