"""Build the phone hero video with a per-shot crop, so each shot keeps its subject in frame.

Usage: python3 scripts/reframe-mobile-video.py <source.mp4> <shots.txt> <out.mp4>
shots.txt lines: "<n> <start> <end> <mid>" (seconds in the source).
FOCUS[n] is the horizontal centre of the subject in shot n, 0 = left edge, 1 = right edge.
"""
import subprocess
import sys

SRC_W, CROP_W = 1280, 405
FOCUS = {
    1: .30, 2: .70, 3: .72, 4: .55, 5: .63, 6: .42, 7: .73, 8: .52, 9: .50, 10: .65,
    11: .50, 12: .33, 13: .38, 14: .32, 15: .43, 16: .50, 17: .55, 18: .60, 19: .68, 20: .42,
    21: .35, 22: .45, 23: .55, 24: .55, 25: .40, 26: .48, 27: .32, 28: .40, 29: .48, 30: .50, 31: .37,
}


def crop_x(focus: float) -> int:
    return max(0, min(SRC_W - CROP_W, round(focus * SRC_W - CROP_W / 2)))


def main(src: str, shots_file: str, out: str) -> None:
    shots = [line.split() for line in open(shots_file) if line.strip()]
    parts = [f"[0:v]split={len(shots)}" + "".join(f"[s{n}]" for n, *_ in shots)]
    for n, start, end, _ in shots:
        x = crop_x(FOCUS[int(n)])
        parts.append(f"[s{n}]trim=start={start}:end={end},setpts=PTS-STARTPTS,crop={CROP_W}:720:{x}:0[c{n}]")
    parts.append("".join(f"[c{n}]" for n, *_ in shots) + f"concat=n={len(shots)}:v=1:a=0,"
                 "hqdn3d=1.2:1.2:4:4,scale=608:1080:flags=lanczos,unsharp=5:5:0.5:5:5:0,format=yuv420p[v]")
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", ";".join(parts), "-map", "[v]", "-an",
           "-c:v", "libx264", "-preset", "slower", "-crf", "25", "-maxrate", "1.6M", "-bufsize", "3.2M",
           "-profile:v", "high", "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit("usage: reframe-mobile-video.py <source.mp4> <shots.txt> <out.mp4>")
    main(*sys.argv[1:])
