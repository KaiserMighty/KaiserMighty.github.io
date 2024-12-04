import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const bootupMessages = [
  'Booting from primary drive A: FAT32 filesystem detected, starting load sequence...',
  'Loading system kernel and initializing runtime environment...',
  'Performing low-level hardware diagnostics: CPU, RAM, and I/O subsystems...',
  'Memory integrity check: 16384 MB detected, no errors found.',
  'Initializing ACPI power management: S3 sleep mode enabled, thermal zones configured.',
  'Detecting storage devices: SATA-0, NVMe-1, USB-0, all devices functional.',
  'Verifying integrity of bootloader: SHA-256 checksum matches, bootloader signature verified.',
  'Configuring PCI Express lanes: 16x configuration for graphics adapter, audio device linked.',
  'Scanning and mounting root filesystem: EXT4, journal replay completed.',
  'Initializing kernel modules: HID, USB 3.0, and Ethernet drivers loaded.',
  'Setting up system clock: RTC synchronized to UTC, NTP server communication initiated.',
  'Launching init process: systemd v249.9, starting units...',
  'Loading cryptographic services: AES hardware acceleration enabled, RNG seeded.',
  'Initializing DMA controllers: memory access optimized for high-speed operations.',
  'Setting up display environment: 1920x1080 @ 60 Hz, EDID data parsed.',
  'Loading graphical interface libraries: OpenGL 4.6 and Vulkan drivers loaded.',
  'Configuring audio devices: codec initialized, sampling rate set to 48 kHz.',
  'Performing USB enumeration: 4 devices detected, all drivers assigned.',
  'Network stack initialization: IPv4 and IPv6 configured, interfaces detected.',
  'Starting DHCP client: IP address successfully acquired from gateway 192.168.0.1.',
  'Mounting secondary partitions: /home, /var, and /tmp mounted with journaling enabled.',
  'Verifying secure boot process: TPM 2.0 active, keys validated.',
  'Scanning for firmware updates: no new updates detected.',
  'Configuring power profiles: high-performance mode enabled for active workloads.',
  'Starting system services: dbus, udev, and rsyslog running.',
  'Synchronizing system time with NTP server pool.ntp.org...',
  'Loading custom shell environment: bash 5.1 configured with user-specific aliases.',
  'Checking available system updates: 0 critical, 3 optional updates available.',
  'Initializing virtual memory subsystem: swap partition mounted and active.',
  'Configuring firewall rules: incoming ports 22 and 80 open, all others blocked.',
  'Performing disk integrity check: fsck completed with no issues detected.',
  'Launching pre-boot diagnostics: GPU, CPU, and cooling system within safe thresholds.',
  'Loading encryption modules: LUKS and dm-crypt active for secured volumes.',
  'Connecting to wireless networks: scanning SSIDs, successfully connected to AP.',
  'Launching multi-threaded process scheduler: round-robin scheduling enabled.',
  'Starting process monitoring tools: htop and system logs accessible.',
  'Detecting and configuring printers: 1 network printer detected, PPD loaded.',
  'Initializing backup services: incremental backup scheduled at 2:00 AM.',
  'Loading virtualization support: VT-x and AMD-V extensions detected and enabled.',
  'Scanning for hardware changes: no new devices detected since last boot.',
  'Optimizing disk usage: unused temporary files deleted, cache cleared.',
  'Configuring user access profiles: 3 users with appropriate permissions loaded.',
  'Verifying license status: activation successful, license valid until 2026.',
  'Launching desktop environment: all services and applets initialized.',
  'Finalizing session setup: desktop icons and preferences restored.',
  'Performing final diagnostics: kernel logs indicate no warnings or errors.',
  'System initialization complete. Operating system ready for use.',
  'Press Enter to access the terminal interface.',
  'Probing SATA bus for connected drives: SATA-1 detected with 2 TB capacity.',
  'Parsing UEFI firmware tables: ACPI settings configured for enhanced performance.',
  'Initializing GPU compute pipelines: CUDA and OpenCL support enabled.',
  'Loading machine learning libraries: TensorFlow acceleration enabled.',
  'Initializing RAID configuration: RAID-5 setup detected, verifying parity.',
  'Configuring hotplugging for PCI devices: dynamic reallocation enabled.',
  'Launching automated recovery system: previous boot marked as successful.',
  'Initializing high-precision event timers (HPET): synchronized with system clock.',
  'Enabling ASLR (Address Space Layout Randomization) for security...',
  'Configuring SELinux policies: enforcing mode active for root and user files.',
  'Starting database services: MySQL and PostgreSQL instances detected.',
  'Optimizing boot sequence: deferred loading for non-critical services.',
  'Loading advanced input devices: touchpad and stylus drivers active.',
  'Calibrating monitor gamma profiles: ICC profile loaded successfully.',
  'Initializing key management service: SSH and GPG keys loaded into memory.',
  'Loading custom kernel parameters: energy-efficient CPU governor active.',
  'Configuring IP routing rules: static and dynamic routes applied.',
  'Enabling IPv6 privacy extensions: random address generation active.',
  'Initializing Bluetooth subsystem: scanning for paired devices...',
  'Mounting encrypted user partitions: LUKS passphrase accepted.',
  'Performing full-text search indexing: metadata indexed for user documents.',
  'Updating repository mirrors: apt, yum, and pacman synchronized.',
  'Launching system integrity verification: rootkit scan initiated.',
  'Configuring journaling logs: persistent storage enabled for /var/log.',
  'Starting system maintenance tasks: orphaned packages removed.',
  'Applying thermal management profiles: CPU and GPU fan curves adjusted.',
  'Loading dynamic kernel module support: DKMS modules compiled and installed.',
  'Setting up environment for Python virtual environments...',
  'Configuring container runtime: Docker daemon and Podman enabled.',
  'Performing startup benchmarking: I/O and CPU tests completed.',
  'Detecting system resources: CPU usage at 2%, memory at 9% utilized.',
  'Parsing audit logs: no anomalies detected in the last session.',
  'Initializing advanced debugging tools: GDB and Valgrind ready for use.',
  'Performing GPU stress test: temperatures within safe operational limits.',
  'Launching network diagnostics suite: packet loss and latency minimal.',
  'Generating random numbers for cryptographic operations...',
  'Starting redundant power supply monitoring: both units functional.',
  'Configuring VLAN tagging for network interfaces...',
  'Finalizing kernel security enhancements: KASLR and KPTI active.',
  'Completing login manager initialization: greeter interface ready.',
  'Preloading frequently accessed libraries into memory...',
  'Loading font rendering engine: anti-aliasing and subpixel smoothing active.',
  'Initializing secondary display output: HDMI and DP active at 4K resolution.',
  'Launching background synchronization tasks for cloud storage.',
  'System checks completed. Operating system prepared for interactive use.'
];

const Bootup = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const getRandomDuration = (min, max) => Math.random() * (max - min) + min;
  const checkOverflow = () => {
    const container = containerRef.current;
    if (container.scrollHeight > container.clientHeight) {
      setVisibleMessages((prev) => prev.slice(1));
    }
  };

  useEffect(() => {
    if (currentLine === 0 && showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
        setCurrentLine(1);
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (currentLine> 0 && currentLine <= bootupMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, bootupMessages[currentLine]]);
        gsap.fromTo(
          `#line-${currentLine}`,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
        setCurrentLine(currentLine + 1);
        checkOverflow();
      }, getRandomDuration(1, 100));
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setVisibleMessages([]);
        setShowPrompt(true);
        setTimeout(() => navigate('/lowlevel'), 1500);
      }, 1500);
    }
  }, [showPrompt, currentLine, navigate]);

  return (
    <div
      ref={containerRef}
      className="bg-[var(--lowlevel-bg)] text-[var(--lowlevel-text)] font-mono h-screen p-6 overflow-hidden"
    >
      {visibleMessages.map((line, index) => (
        <div key={index} id={`line-${index}`} className="text-sm">
          {line}
        </div>
      ))}
      {showPrompt && (
        <div className="text-sm">
          <span className="animate-blink">█</span>
        </div>
      )}
    </div>
  );
};

export default Bootup;
