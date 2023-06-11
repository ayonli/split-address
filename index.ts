export default function splitAddress(address: string, lineLimit: number) {
    const processChunks = (chunks: string[], delimiter: ", " | " ") => {
        const lines: string[] = [];
        let line = "";

        for (let i = 0; i < chunks.length; i++) {
            if (chunks[i].length > lineLimit) {
                const _lines = splitAddress(chunks[i], lineLimit);
                const _lastLine = _lines[_lines.length - 1];

                line && lines.push(line);
                lines.push(..._lines.slice(0, -1));

                if (i === chunks.length - 1) {
                    lines.push(_lastLine);
                } else if (_lastLine.length < lineLimit) {
                    line = _lastLine;
                } else {
                    lines.push(_lastLine);
                }
            } else {
                const newLine = line ? line + delimiter + chunks[i] : chunks[i];

                if (newLine.length < lineLimit) {
                    if (i === chunks.length - 1) {
                        lines.push(newLine);
                    } else {
                        line = newLine;
                    }
                } else if (newLine.length === lineLimit) {
                    lines.push(newLine);
                    line = "";
                } else if (i === chunks.length - 1) {
                    lines.push(line, chunks[i]);
                } else {
                    lines.push(line);
                    line = chunks[i];
                }
            }
        }

        return lines;
    };

    if (address.includes(",")) {
        const chunks = address.split(/\s*,\s*/);
        return processChunks(chunks, ", ");
    } else if (address.includes(" ")) {
        const chunks = address.split(/\s+/);
        return processChunks(chunks, " ");
    } else {
        const lines: string[] = [];

        while (address.length > lineLimit) {
            const line = address.slice(0, lineLimit);
            lines.push(line);
            address = address.slice(lineLimit);
        }

        lines.push(address);

        return lines;
    }
}
