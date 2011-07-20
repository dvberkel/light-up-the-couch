#! /usr/bin/env perl

use strict;
use warnings;

use Getopt::Long;

my $bumpMajor;
my $bumpMinor;

GetOptions(
	'major!' => \$bumpMajor,
	'minor!' => \$bumpMinor,
);

my $file = "lights-out/version";

open(FILE, $file) or die "Can not open $file for reading: $!\n";
my $version = <FILE>;
close(FILE) or die "Can not close $file after reading: $!\n";

$version =~ m/^(\d+)\.(\d+)\.(\d+)$/ or die "invalid version number read in $file\n";

my $major = $1;
my $minor = $2;
my $maintenance = $3;

if ($bumpMajor) {
	$major = $major + 1;
	$minor = 0;
	$maintenance = 0;
} elsif ($bumpMinor) {
	$minor = $minor + 1;
	$maintenance = 0;
} else {
	$maintenance = $maintenance + 1;
}

$version = "$major.$minor.$maintenance";

open(FILE, ">$file") or die "Can not open $file for writing: $!\n";
print FILE $version;
close(FILE) or die "Can not close $file after writing: $!\n";

