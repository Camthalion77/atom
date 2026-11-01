#pragma once

#if defined(__APPLE__) && defined(__cplusplus)

#include <iconv.h>

// Compatibility for superstring 2.4.4 on modern macOS.
// Older code stores iconv_t as void*.

inline int iconv_close(void *descriptor) {
    return ::iconv_close(reinterpret_cast<iconv_t>(descriptor));
}

// Older superstring incorrectly passes iconv_t*.
// The actual descriptor must be passed by value.

inline size_t iconv(
    iconv_t *descriptor,
    char **input,
    size_t *input_length,
    char **output,
    size_t *output_length
) {
    return ::iconv(
        *descriptor,
        input,
        input_length,
        output,
        output_length
    );
}

#endif
