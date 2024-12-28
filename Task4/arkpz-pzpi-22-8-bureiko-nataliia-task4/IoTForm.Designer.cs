using System.Drawing;
using System.Windows.Forms;

namespace IoT
{
    partial class IoTForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.Text = "IoT Product Simulator";
            this.Size = new Size(400, 300);

            // Distance Label
            lblDistance = new Label
            {
                Text = "Distance: 100 cm",
                Location = new Point(20, 20),
                AutoSize = true
            };
            this.Controls.Add(lblDistance);

            // Distance TrackBar
            trackBarDistance = new TrackBar
            {
                Minimum = 0,
                Maximum = 200,
                Value = 100,
                TickFrequency = 10,
                Location = new Point(20, 50),
                Size = new Size(300, 50)
            };
            trackBarDistance.Scroll += TrackBarDistance_Scroll;
            this.Controls.Add(trackBarDistance);

            // LED Indicator
            ledIndicator = new PictureBox
            {
                Size = new Size(50, 50),
                Location = new Point(20, 120),
                BackColor = Color.Gray,
                BorderStyle = BorderStyle.FixedSingle
            };
            this.Controls.Add(ledIndicator);

            // Access Label
            lblAccess = new Label
            {
                Text = "Access: Locked",
                Location = new Point(20, 200),
                AutoSize = true
            };
            this.Controls.Add(lblAccess);

            // Timer for access
            accessTimer = new Timer
            {
                Interval = 7000 // 7 seconds
            };
            accessTimer.Tick += AccessTimer_Tick;
        }

        #endregion
    }
}

