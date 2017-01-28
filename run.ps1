param(
    [Parameter(Mandatory=$true)] [string] $entrypoint,
    [Parameter(ValueFromRemainingArguments=$true)] $remainingArgs
)

docker-compose run `
    --rm `
    --entrypoint=$entrypoint `
    --workdir=/app `
    cli $remainingArgs